import { FC, useContext, useState } from 'react';

import { useTranslation } from 'next-i18next';

import { DEFAULT_MAX_TOKENS } from '@/utils/app/const';

import HomeContext from '@/pages/api/home/home.context';

interface Props {
  label: string;
  onChangeMaxTokens: (maxTokens: number) => void;
}

export const MaxTokensSlider: FC<Props> = ({ label, onChangeMaxTokens }) => {
  const {
    state: { conversations },
  } = useContext(HomeContext);
  const lastConversation = conversations[conversations.length - 1];
  const [maxTokens, setMaxTokens] = useState(
    lastConversation?.max_tokens ?? DEFAULT_MAX_TOKENS,
  );
  const { t } = useTranslation('chat');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setMaxTokens(newValue);
    onChangeMaxTokens(newValue);
  };

  return (
    <div className="flex flex-col">
      <label className="mb-2 text-left text-neutral-700 dark:text-neutral-400">
        {label}
      </label>
      <span className="mt-2 mb-1 text-center text-neutral-900 dark:text-neutral-100">
        {maxTokens}
      </span>
      <input
        className="cursor-pointer"
        type="range"
        min={100}
        max={2048}
        step={1}
        value={maxTokens}
        onChange={handleChange}
      />
    </div>
  );
};
