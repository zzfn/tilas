import React from 'react';
import classNames from "classnames";

export interface BasicProps {
    direction?: 'row' | 'column',
    className?: string
}

const Basic: React.FC<BasicProps> = ({children, direction = 'row', className}) => {
    return (
        <section
            className={classNames(className, 'zzf-layout zzf-box-responsive', `zzf-layout-${direction}`)}>{children}</section>
    );
}

export default Basic;
