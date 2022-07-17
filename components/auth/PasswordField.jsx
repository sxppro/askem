import {
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from '@chakra-ui/react';
import * as React from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

export const PasswordField = React.forwardRef(
  ({ id, fieldName, autoComplete, updateState }, ref) => {
    const { isOpen, onToggle } = useDisclosure();
    const inputRef = React.useRef(null);
    const mergeRef = useMergeRefs(inputRef, ref);

    const onClickReveal = () => {
      onToggle();

      if (inputRef.current) {
        inputRef.current.focus({
          preventScroll: true,
        });
      }
    };

    return (
      <FormControl>
        <FormLabel htmlFor={id}>{fieldName}</FormLabel>
        <InputGroup>
          <InputRightElement>
            <IconButton
              variant="link"
              aria-label={isOpen ? 'Mask password' : 'Reveal password'}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={onClickReveal}
            />
          </InputRightElement>
          <Input
            id={id}
            ref={mergeRef}
            name="password"
            type={isOpen ? 'text' : 'password'}
            autoComplete={autoComplete ? autoComplete : 'current-password'}
            onChange={updateState}
            required
          />
        </InputGroup>
        <FormHelperText>At least 6 characters please :)</FormHelperText>
      </FormControl>
    );
  }
);
PasswordField.displayName = 'PasswordField';
