-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create custom types
create type user_role as enum ('user', 'admin');

-- Create storage buckets
insert into storage.buckets (id, name, public) 
values ('product-images', 'product-images', true);

-- Create tables
create table public.profiles (
  id uuid references auth.users on delete cascade,
  email text unique not null,
  role user_role default 'user'::user_role,
  full_name text,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

create table public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text not null,
  price decimal(10,2) not null check (price >= 0),
  category text not null,
  sizes text[] not null,
  images text[] not null,
  stock integer not null check (stock >= 0),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  items jsonb not null,
  total decimal(10,2) not null check (total >= 0),
  status text not null check (status in ('pending', 'processing', 'shipped', 'delivered')),
  address text not null,
  customer_details jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes
create index products_category_idx on public.products(category);
create index products_price_idx on public.products(price);
create index orders_user_id_idx on public.orders(user_id);
create index orders_status_idx on public.orders(status);

-- Create functions
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$ language plpgsql security definer;

-- Create triggers
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Update timestamps function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Update timestamps triggers
create trigger handle_updated_at_profiles
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at_products
  before update on public.products
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at_orders
  before update on public.orders
  for each row execute procedure public.handle_updated_at();

-- Set up row level security (RLS)
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Products policies
create policy "Products are viewable by everyone"
  on public.products for select
  using (true);

create policy "Admins can insert products"
  on public.products for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid()
      and role = 'admin'
    )
  );

create policy "Admins can update products"
  on public.products for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid()
      and role = 'admin'
    )
  );

create policy "Admins can delete products"
  on public.products for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid()
      and role = 'admin'
    )
  );

-- Orders policies
create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Admins can view all orders"
  on public.orders for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid()
      and role = 'admin'
    )
  );

create policy "Users can create their own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

create policy "Admins can update order status"
  on public.orders for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid()
      and role = 'admin'
    )
  );

-- Storage policies
create policy "Anyone can view product images"
  on storage.objects for select
  using ( bucket_id = 'product-images' );

create policy "Admins can upload product images"
  on storage.objects for insert
  with check (
    bucket_id = 'product-images' and
    exists (
      select 1 from public.profiles
      where id = auth.uid()
      and role = 'admin'
    )
  );

create policy "Admins can update product images"
  on storage.objects for update
  using (
    bucket_id = 'product-images' and
    exists (
      select 1 from public.profiles
      where id = auth.uid()
      and role = 'admin'
    )
  );

create policy "Admins can delete product images"
  on storage.objects for delete
  using (
    bucket_id = 'product-images' and
    exists (
      select 1 from public.profiles
      where id = auth.uid()
      and role = 'admin'
    )
  );

-- Create the first admin user (replace with actual email)
insert into auth.users (id, email)
values ('00000000-0000-0000-0000-000000000000', 'admin@example.com');

update public.profiles
set role = 'admin'
where email = 'admin@example.com';