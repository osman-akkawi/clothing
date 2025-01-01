import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema } from '../../utils/validation';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => Promise<void>;
  isSubmitting: boolean;
}

export type CheckoutFormData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, isSubmitting }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-bold">Shipping Information</h2>
        
        <Input
          label="Full Name"
          error={errors.fullName?.message}
          {...register('fullName')}
        />
        
        <Input
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register('email')}
        />
        
        <Input
          label="Phone Number"
          error={errors.phone?.message}
          {...register('phone')}
        />
        
        <Input
          label="Address"
          error={errors.address?.message}
          {...register('address')}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="City"
            error={errors.city?.message}
            {...register('city')}
          />
          
          <Input
            label="State"
            error={errors.state?.message}
            {...register('state')}
          />
        </div>
        
        <Input
          label="ZIP Code"
          error={errors.zipCode?.message}
          {...register('zipCode')}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        isLoading={isSubmitting}
      >
        Place Order
      </Button>
    </form>
  );
};

export default CheckoutForm;