import {expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '@/app/(loja)/page';

test('HomePage', () => {
    render(<Home />)
    expect(screen.getByText(/Loading.../i)).toBeDefined();    
})