'use client';

type Props = { icon: React.ReactNode; size?: number };

export function Icon({ icon, size = 16, ...props }: Props) {
  return (
    <div className={`[&>svg]:h-[${size}px] [&>svg]:w-[${size}px]`} {...props}>
      {icon}
    </div>
  );
}
