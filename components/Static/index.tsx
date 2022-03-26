import { FC, useContext } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { INLINES } from '@contentful/rich-text-types';

import type { IStaticTextsFields } from '../../@types/generated/contentful';
import { ContentContext } from 'providers/content.provider';

interface StaticProps {
  title?: string;
  text: string;
}

const Static: FC<StaticProps> = ({ text, title }) => {
  const printStaticText = (
    src: IStaticTextsFields[],
    slug: string,
  ): ReturnType<typeof documentToReactComponents> => {
    const options = {
      renderNode: {
        // Using Asset Hyperlinks does not seem to work out-of-the-box.
        // Let's override the node parser for that type of node.
        [INLINES.ASSET_HYPERLINK](node: any) {
          const { value } = node.content[0];
          const { file, title } = node.data.target.fields;
          return <a href={file.url} title={title} download>{value}</a>;
        }
      }
    };
  
    const text = src.find(text => text.slug === slug);
    return text ? documentToReactComponents(text.content, options) : undefined;
  };

  const { staticTexts } = useContext(ContentContext);
  return <section className="site__section">
    { title && <h3 className="site__section__heading has-color">
      { title }
    </h3>}
    {printStaticText(staticTexts, text)}
  </section>
};

export default Static;