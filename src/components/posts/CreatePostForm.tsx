import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  Input,
  Textarea
} from '@nextui-org/react';
import FormButton from '../common/FormButton';

export default function CreatePostForm() {
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form autoComplete="off">
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Post</h3>
            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
            />
            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Describe your content"
            />

            {/* {formState.errors._form ? (
              <div className="p-2 bg-red-200 border text-red-700 border-red-400 text-xs rounded">
                {formState.errors._form.join(', ')}
              </div>
            ) : null} */}
            <FormButton>Submit</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
