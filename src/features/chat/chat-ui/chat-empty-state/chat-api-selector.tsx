import { FC , useState} from "react";
import { ChatAPIModel } from "../../chat-services/models";
import { useChatContext } from "../chat-context";
import { useSession } from "next-auth/react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

interface Prop {
  disable: boolean;
}




export const ChatAPISelector: FC<Prop> = (props) => {
  const { chatBody, onChatAPIModelChange } = useChatContext();



  //let count = 0;
  const [gptModel, setGPTModel] = useState(0);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //setCount(count + 1);
    //count = count + 1;
  }
  const { data: session } = useSession();

  const [checked, setChecked] = useState(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (checked) {
      onChatAPIModelChange("GPT-3" as ChatAPIModel);
    }else{
      onChatAPIModelChange("GPT-4" as ChatAPIModel);
    }
   
    };
    return (
      <FormGroup>
        <FormControlLabel  control={
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      } label=""　
       />
      </FormGroup>
    );
}
