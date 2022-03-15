import { createStyles } from '@mantine/styles';

interface CascaderDropdownProps {
  native: boolean;
}

export const useStyles = createStyles((theme, { native }: CascaderDropdownProps) => ({
  dropdown: {
    ...theme.fn.fontStyles(),
    boxSizing: 'border-box',
    pointerEvents: 'auto',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]
    }`,
    padding: 4,
    overflowY: native ? 'auto' : 'hidden',
    overscrollBehaviorY: 'contain',
    width: '100%',
  },
}));
