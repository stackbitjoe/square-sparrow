import { useMemo, useState } from 'react';
import styles from './style.module.css';

const isDev = process.env.NODE_ENV === 'development';

const withVariants = (Component) => ({ ...props }) => {

    if (props.page._type != "abTestPage" || props.selectedVariant) {
        return <Component {...props} />
    }

    let variants = [0];
    for(var x = 0; x < props.page.fields.testSections.length; x++) {
        variants.push(x+1);
    }

    let initialState = 0;
    const [currentVariant, setVariant] = useState(initialState);

    if (isDev) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.controls}>
                    <select
                        id="variant-selection"
                        onChange={(e) => setVariant(e.target.value)}
                        value={currentVariant}
                    >
                        <optgroup label="Force Variant">
                            {variants.map((variant) => {
                                return (
                                    <option key={variant} value={variant}>{`Variant: ${variant}`}</option>
                                );
                            })}
                        </optgroup>
                    </select>
                </div>

                <Component currentVariant={currentVariant} {...props} />
            </div>
        );
    } else {
        <Component currentVariant={currentVariant} {...props} />
    }
}

export default withVariants;