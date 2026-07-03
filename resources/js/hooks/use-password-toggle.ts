import { useState } from 'react';

export function usePasswordToggle() {
    const [visible, setVisible] = useState(false);

    function toggle() {
        setVisible((v) => !v);
    }

    return { visible, toggle, inputType: visible ? 'text' : 'password' } as const;
}
