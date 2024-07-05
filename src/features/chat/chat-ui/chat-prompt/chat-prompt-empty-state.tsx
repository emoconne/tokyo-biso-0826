import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FC, useState , FormEvent, useRef } from "react";
import { Card } from "@/components/ui/card";
import { ChatPrompt } from "@/features/chat/chat-prompt/chat-prompt";
import { ChatPromptContainer } from "@/features/chat/chat-prompt/chat-prompt-container";
interface Props {}
import { useParams, useRouter } from "next/navigation";
import { useGlobalMessageContext } from "@/features/global-message/global-message-context";
import { SoftDeleteChatThreadByID } from "@/features/chat/chat-services/chat-thread-service";





//const [promptTitle, setPromptTitle] = useState();
//const [promptContent, setPromptContent] = useState();


const ChatPromptEmptyState: FC<Props> = (props) => {

  const { id } = useParams();
  const router = useRouter();
  const { showError } = useGlobalMessageContext();

  const sendData = async (threadID: string) => {
    try {
      await SoftDeleteChatThreadByID(threadID);
      router.refresh();
      router.replace("/chat");
    } catch (e) {
      console.log(e);
      showError("" + e);
    }
  };  
  
  return (
  
    <div className="grid grid-cols-7 h-full w-full items-center container mx-auto max-w-4xl justify-center h-full gap-1">
      <Card className="col-span-3 flex flex-col gap-1 p-5 h-full w-full">
        <div className="col-span-2 gap-1 flex flex-col flex-1 justify-start">
  
        <ChatPromptContainer>
          <ChatPrompt />
        </ChatPromptContainer>
        </div>
      </Card>
     <Card className="col-span-4 flex flex-col gap-1 p-5 h-full w-full">
     <div className="flex gap-3 items-center flex-1">
            <Textarea
              name = "title"
              placeholder="プロンプトを入力してください。"
              className="min-h-fit bg-background shadow-sm resize-none py-0 "
            ></Textarea>
          </div>
          <p className="text-xs text-muted-foreground">
          <Textarea
            name = "prompt"
            placeholder="下記の文章を要約してください"
            className="min-h-fit bg-background shadow-sm resize-none py-4 pr-[80px] h-[50vh]"
        ></Textarea>
          </p>
          <Button
            variant={"ghost"}
            size={"sm"}
            title="削除"
            className="justify-right flex bg-green-500 text-white"
            onClick={async (e) => {
              e.preventDefault();
              const yesDelete = confirm(
                "プロンプトを削除しますか？"
              );
              if (yesDelete) {
                //setPromptTitle("Hello World");
                //await sendData(thread.id);
              }
            }}
          >
            削除
          </Button>
          <Button
            variant={"ghost"}
            size={"sm"}
            title="保存"
            className="justify-right flex bg-green-500 text-white"
            onClick={async (e) => {
              e.preventDefault();
              const yesDelete = confirm(
                "プロンプトを保存しますか？"
              );
              if (yesDelete) {
                //await sendData(thread.id);
              }
            }}
         >
            保存
          </Button>
     </Card>
    </div>

  );
};

export default ChatPromptEmptyState;
