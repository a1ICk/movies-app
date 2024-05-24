'use client';

import {
  useCombobox,
  Combobox,
  Group,
  Pill,
  PillsInput,
  Input,
  Text,
} from '@mantine/core';
import { IGenre } from '../../lib/genre';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function GenresSelect({ data }: { data: IGenre[] }) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = useSearchParams();

  function handleGenres(genres: string) {
    const p = new URLSearchParams(params);
    if (genres) {
      p.set('genres', genres);
    } else {
      p.delete('genres');
    }
    replace(`${pathname}?${p.toString()}`);
  }

  let gens: string[] = [];

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [value, setValue] = useState<string[]>([]);

  const handleValueSelect = (val: string) =>
    setValue((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val],
    );

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));

  const values = value.map((item, index) => (
    <Text key={item}>
      {item}
      {value.length - 1 === index ? '' : ', '}
    </Text>
  ));

  const options = data.map((item) => {
    return (
      <Combobox.Option
        value={String(item.id)}
        key={item.id}
        active={value.includes(item.name)}
      >
        <Group gap="sm">
          <span>{item.name}</span>
        </Group>
      </Combobox.Option>
    );
  });

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleValueSelect}
      withinPortal={false}
    >
      <Combobox.DropdownTarget>
        <PillsInput pointer onClick={() => combobox.toggleDropdown()} w={284}>
          <Pill.Group>
            {values.length > 0 ? (
              values
            ) : (
              <Input.Placeholder>Select Genres</Input.Placeholder>
            )}

            <Combobox.EventsTarget>
              <PillsInput.Field
                type="hidden"
                onBlur={() => {
                  combobox.closeDropdown();
                  handleGenres(value.join('|'));
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace') {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
