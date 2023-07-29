type Props = {
  message: string;
};

export const ErrorMessage = ({ message }: Props) => {
  return (
    <div>{message}</div>
  );
};
