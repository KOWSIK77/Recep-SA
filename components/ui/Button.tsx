import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid-gold' | 'outline-gold' | 'primary-maroon' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isExternal?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = 'solid-gold',
  size = 'md',
  href,
  isExternal = false,
  icon,
  children,
  className = '',
  onClick,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs tracking-wider min-h-[44px]',
    md: 'px-6 py-3 text-xs sm:text-sm tracking-widest min-h-[48px]',
    lg: 'px-8 py-4 text-sm sm:text-base tracking-widest min-h-[52px]',
  }[size];

  const variantClasses = {
    'solid-gold':
      'bg-accent text-primary font-semibold hover:bg-accent-light active:scale-[0.98] shadow-gold hover:shadow-gold-lg border border-accent-light/40',
    'outline-gold':
      'bg-transparent text-primary font-medium border border-accent hover:bg-accent/10 active:scale-[0.98]',
    'primary-maroon':
      'bg-primary text-secondary font-medium hover:bg-primary-dark active:scale-[0.98] shadow-temple border border-accent/30',
    ghost:
      'bg-transparent text-ink hover:text-accent active:scale-[0.98]',
  }[variant];

  const baseClasses =
    'inline-flex items-center justify-center gap-2.5 rounded-full uppercase font-sans transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
