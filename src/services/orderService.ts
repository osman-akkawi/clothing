import { supabase } from '../lib/supabase';
import { Order } from '../types';

export const orderService = {
  async createOrder(order: Omit<Order, 'id' | 'createdAt'>) {
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        user_id: order.userId,
        items: order.items,
        total: order.total,
        status: order.status,
        address: order.address,
        customer_details: order.customerDetails,
        created_at: new Date().toISOString(),
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    const formattedOrder = {
      ...data,
      userId: data.user_id,
      customerDetails: data.customer_details,
      createdAt: data.created_at,
    } as Order;
    
    await this.sendOrderNotification(formattedOrder);
    
    return formattedOrder;
  },

  async getOrders(userId?: string) {
    let query = supabase.from('orders').select('*');
    
    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data.map(order => ({
      ...order,
      userId: order.user_id,
      customerDetails: order.customer_details,
      createdAt: order.created_at,
    })) as Order[];
  },

  async updateOrderStatus(orderId: string, status: Order['status']) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      ...data,
      userId: data.user_id,
      customerDetails: data.customer_details,
      createdAt: data.created_at,
    } as Order;
  },

  async deleteOrder(orderId: string) {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', orderId);
    
    if (error) throw error;
  },

  async sendOrderNotification(order: Order) {
    const itemsList = order.items
      .map(item => 
        `${item.product.name} (${item.size}) x${item.quantity} - ${
          new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(item.product.price * item.quantity)
        }`
      )
      .join('\\n');

    const message = `
🛍️ New Order #${order.id}

👤 Customer Details:
Name: ${order.customerDetails.fullName}
Phone: ${order.customerDetails.phone}
Email: ${order.customerDetails.email}

📦 Order Items:
${itemsList}

📍 Delivery Address:
${order.address}

💰 Total Amount: ${
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(order.total)
    }

Payment Method: Cash on Delivery
    `.trim();

    console.log('WhatsApp notification:', message);
  },
};