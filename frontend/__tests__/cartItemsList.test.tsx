import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import CartItemsList, { CartItemsListProps } from '@/components/cart/CartItemsList';
import CartItem from '@/data/model/CartItem';
import { Shoe } from '@/data/model/Shoe';

describe('CartItemsList Component', () => {
  const shoe: Shoe = {
    id: '1',
    brand: 'Adidas',
    price: 100,
    availableSizes: [38, 39, 40],
  };

  const cartItem: CartItem = {
    shoe,
    quantity: 2,
  };

  const defaultProps: CartItemsListProps = {
    item: cartItem,
    add: vi.fn(),
    remove: vi.fn(),
  };

  it('renders the cart item information correctly', () => {
    render(<CartItemsList {...defaultProps} />);

    // Check for brand
    expect(screen.getByText(/Adidas/i)).toBeInTheDocument();

    // Check for price and quantity
    expect(screen.getByText(/€ 100.00/i)).toBeInTheDocument();

    // Check for total price
    expect(screen.getByText(/€ 200.00/i)).toBeInTheDocument();
  });

});