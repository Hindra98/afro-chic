import React, { useEffect, useState } from 'react';

/**
 * Displays localized value
 * @param provider
 */
export const UILocalizerFactory = (provider: {
  get: (key: string) => string,
  loaded: boolean,
  load: () => Promise<void>
}) => function UILocalizer(props: { name: string }) {
  const [loaded, setLoaded] = useState(provider.loaded);
  const [value, setValue] = useState<string>(null);

  useEffect(() => {
    if (loaded) setValue(provider.get(props.name));
  }, [props.name, loaded])

  if (!loaded) {
    provider.load().then(() => setLoaded(true));
  }

  return loaded ? <>{value}</> : <>...</>
};
