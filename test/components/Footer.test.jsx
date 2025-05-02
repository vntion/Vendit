/**
 * Skenario testing
 *
 * - Footer Component
 * - should render Footer correctly
 */

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Footer from '../../src/ui/Footer'

describe('Footer Component', () => {
  it('should render Footer correctly', () => {
    render(<Footer />)
    const footerElement = screen.getByRole('contentinfo')
    const footerText = footerElement.textContent

    expect(footerElement).toBeInTheDocument()
    expect(footerText).toBe('©Created by Baskoro Adi W')
    expect(footerElement.className).toContain(
      'bg-slate-800 py-3 text-center text-xs'
    )
  })
})
