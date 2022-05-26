import Head from 'next/head';
import { withHotContentReload } from '@stackbit/nextjs-hot-content-reload/hotContentReload';

import { getComponent } from '../index';

const Page = (props) => {
    if (!props.page) {
        return null;
    }

    const { page: { _id, fields } } = props;

    let cookiedVariant = props.currentVariant;
    if(props.selectedVariant) {
        cookiedVariant = props.selectedVariant;
    }

    if(!cookiedVariant || cookiedVariant == 0) {
        return <>
            <Head>
                <title>{fields.title}</title>
            </Head>
            <main data-sb-object-id={_id}>
                {fields.sections?.map((section, index) => {
                    const Component = getComponent(section._type);

                    return (<Component path={`sections.${index}`} key={`${section.type}-${index}`} {...section} />);
                })}
            </main>
        </>
    } else {
        return <>
            <Head>
                <title>{fields.title}</title>
            </Head>
            <main data-sb-object-id={_id}>
                <div data-sb-field-path={`testSections.${cookiedVariant - 1}`}>
                {fields.testSections[cookiedVariant - 1].fields.sections.map((section, index) => {
                    const Component = getComponent(section._type);

                    return (<Component path={`.sections.${index}`} key={`${section.type}-${index}`} {...section} />);
                })}
                </div>
            </main>
        </>
    }
}

export default withHotContentReload(Page);