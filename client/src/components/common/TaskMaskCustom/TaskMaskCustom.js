import React from 'react';
import MaskedInput from "react-text-mask/dist/reactTextMask";
import PropTypes from "prop-types";

const TextMaskCustom = props => {
    const {inputRef, ...other} = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', '0', '0', /[0-9]/, /[0-9]/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
};

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

export default TextMaskCustom;
