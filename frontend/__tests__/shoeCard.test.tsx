import { render, screen } from '@testing-library/react';
import {vi, expect, describe, it } from 'vitest';
import ShoeCard, { ShoeCardProps } from '@/components/shoe/ShoeCard';
import { Shoe } from '@/data/model/Shoe';

// Mock `useCart` hook
vi.mock('@/data/hooks/useCart', () => ({
  default: () => ({
    addItem: vi.fn(), // Mock function for addItem
  }),
}));

describe('ShoeCard Component', () => {
  const shoe: Shoe = {
    id: '1',
    brand: 'Nike',
    price: 120,
    availableSizes: [38, 39, 40],    
  };

  const defaultProps: ShoeCardProps = {
    shoe,
  };

  it('renders the shoe information correctly', () => {
    render(<ShoeCard {...defaultProps} />);

    // Check for brand
    expect(screen.getByText(/Nike/i)).toBeInTheDocument();

    // Check for sizes
    expect(screen.getByText(/Sizes: 38, 39, 40/i)).toBeInTheDocument();

    // Check for price
    expect(screen.getByText(/€ 120.00/i)).toBeInTheDocument();
  });

});