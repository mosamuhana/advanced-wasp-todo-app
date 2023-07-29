import toggleAllTasks from '@wasp/actions/toggleAllTasks.js';

type Props = {
  disabled: boolean;
};

export const ToggleAllTasks = ({ disabled }: Props) => {
  const onClick = async () => {
    try {
      await toggleAllTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      className="btn btn-primary w-8 h-8 flex items-center justify-center"
      disabled={disabled}
      onClick={onClick}
    >
      ✓
    </button>
  );
};

// className="btn btn-primary"
