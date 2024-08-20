import { Button } from "@/components/ui/button";
import { FC, useState , FormEvent, useRef , Fragment } from "react";
import { Card } from "@/components/ui/card";
interface Props {}
import { useParams, useRouter } from "next/navigation";
import { useGlobalMessageContext } from "@/features/global-message/global-message-context";
interface Prop {}
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { CheckIcon, ClipboardIcon, UserCircle } from "lucide-react";

import { CreatePromptThread } from "../../chat-services/prompt-thread-service";
import { useSession } from "next-auth/react";


//const [promptTitle, setPromptTitle] = useState();
//const [promptContent, setPromptContent] = useState();


//const ChatPromptEmptyState: FC<Props> = (props) => {
const ChatPromptEmptyState = async () => {

  const { id } = useParams();
  //const router = useRouter();
  const { showError } = useGlobalMessageContext();

  const [open, setOpen] = useState(true);
  const [open_personal, setOpen_personal] = useState(true);
  const [promptTitle, setPromptTitle] = useState("");
  const [promptContent, setPromptContent] = useState("");
  const [dept, setDept] = useState("");
  const [promptId, setPromptId] = useState(0);
  const [promptNew,setPromptNew] = useState(false);
  const titleChange = (value:string) => {
    console.log(value);
    setPromptTitle(value);
  }
  const contentChange = (value:string) => {
    setPromptContent(value);
  }
  const { data: session } = useSession();

  const [prompt , setPrompt] = useState<Prompt[]>([]);

  type Prompt = {
    title: string;
    content: string;
    id: number;
    dept: string;
  };

  // データベース登録テスト

  const startNewChat = async () => {
    try {
      const newChatThread = await CreatePromptThread(dept,promptTitle,promptContent);
      alert(promptTitle);
      /*
      if (newChatThread) {
        router.push("/chat/" + newChatThread.id);
        router.refresh();
      }*/
    } catch (e) {
      console.log(e);
    }
    
  };


  const handleClick_company_all = () => {
    setOpen(!open);
  };
  const handleClick_personal_all = () => {
    setOpen_personal(!open_personal);
  };
  
  function PromtList(props:{dept?:string}): JSX.Element {

    const newPrompt = prompt.filter((item) => item.dept === dept);
    return (
      <>

     {newPrompt.map((item) => (
      <>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemText secondary={item.title} onClick={() => listClick(item.title, item.content,item.dept,item.id)} />
      </ListItemButton>
      </>
    ))}
     </>
    );
  }

  /*const PromptMenu = async () => {
    const items = await FindAllPrompt();
    return items
  };*/
  
  const listClick = async　(title:string,content:string,dept:string,id:number) => {
    const currentTimestamp = Date.now();
    const idNew = Number(currentTimestamp);
    if (id === 0) {
      setPromptTitle("");
      setPromptContent("");
      setDept(dept);
      setPromptId(idNew);
      setPromptNew(true);

    } else {
      setPromptTitle(title);
      setPromptContent(content);
      setDept(dept);
      setPromptId(id);
      setPromptNew(false);
    }
  };  
  const [isIconChecked, setIsIconChecked] = useState(false);
  const toggleIcon = () => {
    setIsIconChecked((prevState) => !prevState);
  };
  const handleButtonClick = () => {
    toggleIcon();
    navigator.clipboard.writeText(promptContent);
  }; 

  const promtEdit = (id:number) => {

    const newPrompt = prompt.find((item) => item.id === id);
    alert(id);
    if (prompt) {
      setPromptTitle(promptTitle);
      setPromptContent(promptContent);
      setPromptId(id);

    }
  }

  const saveButtonClick = async　 () => {
    const currentTimestamp = Date.now();
    const id = Number(currentTimestamp);
    if (promptNew === true) {
      const newPrompt = { 
        title: promptTitle,
        content: promptContent,
        id: id,
        dept: dept
      };
      setPrompt([...prompt, newPrompt]);

      const newChatThread = await CreatePromptThread(dept,promptTitle,promptContent);

    } else {
      promtEdit(promptId);
    }
  }; 
  return (
    <div className="grid grid-cols-7 h-full w-full items-center container mx-auto max-w-4xl justify-center h-full gap-1">
      <Card className="col-span-3 flex flex-col gap-1 p-o h-full w-full">
      <p className="text-xs text-muted-foreground">


        <div className="col-span-2 gap-1 flex flex-col flex-1 justify-start text-xs"> 
        <List 
          //sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          className="min-h-fit bg-background shadow-sm resize-none py-1 w-full"
          component="nav" 
        >
          <ListItemButton　onClick={handleClick_company_all}>
            <ListItemText className="text-xs" secondary="会社全体" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton> 
          <Collapse in={open} timeout="auto" unmountOnExit>
          {session?.user?.isAdmin ? (
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText secondary="新規" onClick={() => listClick("", "","会社全体",0)} />
            </ListItemButton>
        ) : (
          <></>
        )}
          <List component="div" disablePadding>
            <PromtList dept="会社全体"/>
           </List>            
          </Collapse>     
          <ListItemButton onClick={handleClick_personal_all}>
            <ListItemText secondary="個人" />
            {open_personal ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open_personal} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText secondary="新規" onClick={() => listClick("", "","個人",0)} />
              </ListItemButton>
              <PromtList dept="個人"/>
            </List>
          </Collapse>                                
         </List>  
        </div>
      </p>
      </Card>
     <Card className="col-span-4 flex flex-col gap-1 p-5 h-full w-full">
          <p className="text-xs text-muted-foreground">
          <div className="flex gap-3 items-center flex-1 p-0">
            <textarea
              name = "title"
              className="min-h-fit bg-background shadow-sm resize-none py-1 w-full"
              value={promptTitle==="" ? "" : promptTitle}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => titleChange(e.target.value)}
            ></textarea>
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
          </p>
          <p className="text-xs text-muted-foreground">

            <input type = "hidden" name = "dept" value = {dept}></input>
            <input type = "hidden" name = "id" value = {promptId}></input>
          </p>
          <p className="text-xs text-muted-foreground">
          <textarea
              name = "prompt"
              className="min-h-fit w-full bg-background shadow-sm resize-none py-4 h-[60vh]"
              value={promptContent==="" ? "" : promptContent}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => contentChange(e.target.value)}
            >{promptContent==="" ? "" : promptContent}</textarea>
            </p>
            <Button
            variant={"ghost"}
            size={"sm"}
            title="保存"
            className="justify-right flex bg-green-500 text-white"
            onClick={() => saveButtonClick()}
                     >
            保存
          </Button>
         </Card>
    </div>

  );
};

export default ChatPromptEmptyState;
