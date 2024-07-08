import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FC, useState , FormEvent, useRef } from "react";
import { Card } from "@/components/ui/card";
//import { ChatPrompt } from "@/features/chat/chat-prompt/chat-prompt";
import { ChatPromptContainer } from "@/features/chat/chat-prompt/chat-prompt-container";
interface Props {}
import { useParams, useRouter } from "next/navigation";
import { useGlobalMessageContext } from "@/features/global-message/global-message-context";
import { SoftDeleteChatThreadByID } from "@/features/chat/chat-services/chat-thread-service";
interface Prop {}
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { CheckIcon, ClipboardIcon, UserCircle } from "lucide-react";
import { stringify } from "querystring";
import { title } from "process";


//const [promptTitle, setPromptTitle] = useState();
//const [promptContent, setPromptContent] = useState();


const ChatPromptEmptyState: FC<Props> = (props) => {

  const { id } = useParams();
  const router = useRouter();
  const { showError } = useGlobalMessageContext();

  const [open, setOpen] = useState(true);
  const [open_personal, setOpen_personal] = useState(true);
  const [promptTitle, setPromptTitle] = useState("");
  const [promptContent, setPromptContent] = useState("");
  const [dept, setDept] = useState("");
  const [promptId, setPromptId] = useState(0);
  const titleChange = (e: FormEvent<HTMLInputElement>) => {
    setPromptTitle(e.currentTarget.value);
  }
  const contentChange = (e: FormEvent<HTMLInputElement>) => {
    setPromptContent(e.currentTarget.value);
  }

  const [prompt , setPrompt] = useState<Prompt[]>([]);
  type Prompt = {
    title: string;
    content: string;
    id: number;
    dept: string;
  };
  const handleClick_company_all = () => {
    setOpen(!open);
  };
  const handleClick_personal_all = () => {
    setOpen_personal(!open_personal);
  };

/*  const listClick = (id:number) => {
    alert(id);

  };  */
  const listClick = (title:string,content:string) => {
    setPromptTitle(title);
    setPromptContent(content);
    setDept("company");
    setPromptId(0);

    alert(promptTitle);
/*    setPromptTitle(prompt[id].title);
    setPromptContent(prompt[id].content);
    setDept(prompt[id].dept);
    setPromptId(prompt[id].id);
*/
  };  
  const [isIconChecked, setIsIconChecked] = useState(false);
  const toggleIcon = () => {
    setIsIconChecked((prevState) => !prevState);
  };
  const handleButtonClick = () => {
    toggleIcon();
    //navigator.clipboard.writeText(props.message);
  }; 
  const saveButtonClick = (id:number) => {
    const currentTimestamp = Date.now();
    id = Number(currentTimestamp);
    const newPrompt = { 
      title: promptTitle,
      content: promptContent,
      id: id,
      dept: "company"
    };
    setPrompt([newPrompt , ...prompt]);    
  /*
   if id == 0 {
      alert("save");
    } else {
      alert("update");
    };
  */
  }; 
  const mail = "背景、いつも大変お世話になっております。お忙しいところ恐縮ですが、以下の件についてご確認いただきたく存じます。";

  return (
    <div className="grid grid-cols-7 h-full w-full items-center container mx-auto max-w-4xl justify-center h-full gap-1">
      <Card className="col-span-3 flex flex-col gap-1 p-5 h-full w-full">
        <div className="col-span-2 gap-1 flex flex-col flex-1 justify-start">
  
        <ChatPromptContainer>
          <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav" 
          className="text-xs text-muted-foreground"
        >
          <ListItemButton　onClick={handleClick_company_all}>
            <ListItemText primary="会社全体" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>

              <ListItemText primary="取引先にメールする" onClick={(event: React.MouseEvent<HTMLDivElement>) => listClick("取引先にメールする", mail)} />
            </ListItemButton>
          </List>            
          </Collapse>           
            
          <ListItemButton onClick={handleClick_personal_all}>
            <ListItemText primary="個人" />
            {open_personal ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open_personal} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="新規" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="文章を要約する" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>        
      </ChatPromptContainer>
        </div>
      </Card>
     <Card className="col-span-4 flex flex-col gap-1 p-5 h-full w-full">
          <label
              //name = "dept"
              className="min-h-fit bg-background shadow-sm resize-none py-0 "
          >{}</label>
          <div className="flex gap-3 items-center flex-1">
            <textarea
              name = "title"
              className="min-h-fit bg-background shadow-sm resize-none py-0 pr-[200px] "
              //value={promptTitle}
              //onChange={(e) => titleChange(e)}
            >{promptTitle}</textarea>
          <Button
            variant={"ghost"}
            size={"sm"}
            title="Copy text"
            className="justify-right flex"
            onClick={handleButtonClick}
          >
            {isIconChecked ? (
              <CheckIcon size={16} />
            ) : (
              <ClipboardIcon size={16} />
            )}
          </Button>            

          </div>
          <p className="text-xs text-muted-foreground">
          <textarea
            name = "prompt"
            className="min-h-fit bg-background shadow-sm resize-none py-4 pr-[300px] h-[50vh]"
            //value={promptContent}
            //onChange={(e) => contentChange(e)}
            >{promptContent}</textarea>
            <input type = "hidden" name = "dept" value = {dept}></input>
            <input type = "hidden" name = "id" value = {promptId}></input>
          </p>
          <Button
            variant={"ghost"}
            size={"sm"}
            title="保存"
            className="justify-right flex bg-green-500 text-white"
            //onClick={saveButtonClick(0)}
            
         >
            保存!
          </Button>
     </Card>
    </div>

  );
};

export default ChatPromptEmptyState;
