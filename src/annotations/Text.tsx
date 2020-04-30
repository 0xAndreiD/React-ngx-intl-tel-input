/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2020 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import React from 'react';

import PdfJs from '../vendors/PdfJs';
import Annotation from './Annotation';
import AnnotationType from './AnnotationType';
import Popup from './Popup';

interface TextProps {
    annotation: PdfJs.Annotation;
    childAnnotation?: PdfJs.Annotation;
    page: PdfJs.Page;
    viewport: PdfJs.ViewPort;
}

const Text: React.FC<TextProps> = ({ annotation, childAnnotation, page, viewport }) => {
    const hasPopup = annotation.hasPopup === false;
    const isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);

    return (
        <Annotation annotation={annotation} hasPopup={hasPopup} ignoreBorder={false} isRenderable={isRenderable} page={page} viewport={viewport}>
            {(props): React.ReactElement => (
                <>
                <div
                    {...props.slot.attrs}
                    data-annotation-id={annotation.id}
                    onClick={props.popup.toggleOnClick}
                    onMouseEnter={props.popup.openOnHover}
                    onMouseLeave={props.popup.closeOnHover}
                >
                    {props.slot.children}
                </div>
                {childAnnotation && childAnnotation.annotationType === AnnotationType.Popup && props.popup.opened && (
                    <Popup
                        annotation={childAnnotation}
                        page={page}
                        viewport={viewport}
                    />
                )}
                </>
            )}
        </Annotation>
    );
};

export default Text;
