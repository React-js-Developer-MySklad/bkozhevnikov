import React, {ReactNode, useEffect, useRef, useState} from "react";
import './modal.css'
import { createPortal } from "react-dom";

type Props = {
    show: boolean;
    hideModal: () => void;
    children: ReactNode;
}

export const Modal: React.FC<Props> = ({show, hideModal, children: content}) => {
    const ref = useRef(null);

    // click вне
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
                hideModal();
            }
          }
        if (show) {
            document.addEventListener("mousedown", handleClick);
        } else {
            document.removeEventListener("mousedown", handleClick);
        }
        return () => {
            document.removeEventListener("mousedown", handleClick);
          };
    }, [show, hideModal])


    if (show) {
        return createPortal(<div className="modal" ref={ref}>
            {content}
        </div>, document.body);
    }
    return null;
}