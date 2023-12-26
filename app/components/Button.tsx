'use client';

interface ButtonProps {
  pending?: boolean;
  disabled: boolean;
  type: 'button' | 'submit' | 'reset';
  text: string;
}

const Button = ({
  pending = false,
  disabled,
  type = 'button',
  text,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={pending || disabled}
      className={`flex w-full items-center justify-center rounded-[4px] px-[32px] py-[16px] text-defaultLabelBg transition  ${
        pending || disabled
          ? 'cursor-not-allowed bg-inactiveButton'
          : 'bg-defaultButton hover:bg-hoverButton'
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
