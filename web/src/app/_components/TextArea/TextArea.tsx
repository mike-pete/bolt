// thanks Owen Herterich
// https://medium.com/@oherterich/creating-a-textarea-with-dynamic-height-using-react-and-typescript-5ed2d78d9848

import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

type TextAreaProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  [x: string]: unknown;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, forwardRef) => {
    const { value, setValue, ...rest } = props;
    const textAreaRef = useRef<HTMLTextAreaElement>();
    useImperativeHandle(forwardRef, () => textAreaRef.current);

    useEffect(() => {
      if (textAreaRef?.current) {
        // We need to reset the height momentarily to get the correct scrollHeight for the textarea
        textAreaRef.current.style.height = "0px";
        const scrollHeight = textAreaRef.current.scrollHeight;

        // We then set the height directly, outside of the render loop
        // Trying to set this with state or a ref will product an incorrect value.
        textAreaRef.current.style.height = scrollHeight + "px";
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target?.value);
    };

    return (
      <textarea
        onChange={handleChange}
        ref={textAreaRef}
        value={value}
        {...rest}
      />
    );
  },
);
TextArea.displayName = "TextArea";

export default TextArea;