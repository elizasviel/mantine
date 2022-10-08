import { DefaultProps, MantineSize, Selectors } from '@mantine/core';
import { SelectScrollArea } from '@mantine/core/src/Select/SelectScrollArea/SelectScrollArea';
import React, { forwardRef } from 'react';
import { CascaderItem } from '../types';
import { useStyles } from './CascaderItemsList.styles';

export type CascaderMenuStyles = Selectors<typeof useStyles>;

export interface CascaderMenuProps extends DefaultProps<CascaderMenuStyles> {
  data: CascaderItem[];
  hovered: number[];
  __staticSelector: string;
  isItemSelected?(itemValue: string, nesting: number): boolean;
  uuid: string;
  itemsRefs?: React.MutableRefObject<HTMLElement[][]>;
  onItemHover: React.Dispatch<React.SetStateAction<number[]>>;
  onItemSelect(item: CascaderItem, index: number): void;
  size: MantineSize;
  itemComponent: React.FC<any>;
  menuComponent: React.FC<any>;
  nesting: number;
  maxDropdownHeight: number;
}

export const CascaderItemsList = forwardRef<HTMLDivElement, CascaderMenuProps>(
  (
    {
      data,
      hovered,
      classNames,
      styles,
      __staticSelector,
      uuid,
      isItemSelected,
      itemsRefs,
      onItemHover,
      onItemSelect,
      size,
      nesting,
      maxDropdownHeight,
      itemComponent: Item,
      menuComponent: MenuComponent,
    }: CascaderMenuProps,
    ref
  ) => {
    const { classes } = useStyles({ size }, { classNames, styles, name: __staticSelector });

    // eslint-disable-next-line no-param-reassign
    if (!itemsRefs.current[nesting]) itemsRefs.current[nesting] = [];

    return (
      <SelectScrollArea style={{ maxHeight: maxDropdownHeight, width: 'auto' }} ref={ref}>
        <MenuComponent
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {data.map((item, index) => {
            const selected = isItemSelected(item.value, nesting);
            const isHovered = hovered[nesting] === index;
            return (
              <Item
                key={item.value}
                size={size}
                hasChildren={item.children && item.children.length > 0}
                className={classes.item}
                data-disabled={item.disabled || undefined}
                data-hovered={(!item.disabled && isHovered) || undefined}
                data-selected={(!item.disabled && selected) || undefined}
                onMouseEnter={() =>
                  onItemHover(
                    (prev) =>
                      prev.length === nesting
                        ? [...prev, index] // higher nesting level
                        : prev.length - 1 === nesting
                        ? [...prev.slice(0, prev.length - 1), index] // same nesting level
                        : [...prev.slice(0, prev.length - (nesting + 2)), index] // lower nesting level
                  )
                }
                id={`${uuid}-${nesting}-${index}`}
                role="option"
                tabIndex={-1}
                aria-selected={hovered[nesting] === index}
                ref={(node: HTMLDivElement) => {
                  if (itemsRefs && itemsRefs.current) {
                    // eslint-disable-next-line no-param-reassign
                    itemsRefs.current[nesting][index] = node;
                  }
                }}
                onMouseDown={
                  !item.disabled
                    ? (event: React.MouseEvent<HTMLDivElement>) => {
                        event.preventDefault();
                        onItemSelect(item, index);
                      }
                    : null
                }
                disabled={item.disabled}
                {...item}
              />
            );
          })}
        </MenuComponent>
      </SelectScrollArea>
    );
  }
);
