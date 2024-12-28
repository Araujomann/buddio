import { Toaster } from 'react-hot-toast';

interface ToastyProps {
  children: React.ReactNode;
  toast: void;
}
export const Toasty: React.FC<ToastyProps> = ({ children }) => {
  return (
    <div>
      {children}
      <Toaster />
    </div>
  );
};
