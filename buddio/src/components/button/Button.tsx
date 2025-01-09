import React from 'react';


interface Props {
  text: string;
  color: string;
  textColor: string;
  onClick: () => void;
  borderColor?: string;
}

export const Button: React.FC<Props> = ({
  text,
  color,
  textColor,
  borderColor,
  onClick,
}) => {
  const style = {
    backgroundColor: color,
    color: textColor,
    borderColor: borderColor || 'transparent',
  };

  return (
    <button style={style} className="rounded-full" onClick={onClick}>
      {text}
    </button>
  );
};
