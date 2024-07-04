import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChatContext } from "@/features/chat/chat-ui/chat-context";
import { useGlobalConfigContext } from "@/features/global-config/global-client-config-context";
import { Loader, Send } from "lucide-react";
import { FC, FormEvent, useRef } from "react";
import { ChatFileSlider } from "../chat-file/chat-file-slider";
import { Microphone } from "../chat-speech/microphone";
import { useChatInputDynamicHeight } from "../chat-input/use-chat-input-dynamic-height";
import { Card } from "@/components/ui/card";
import { ChatPrompt } from "@/features/chat/chat-prompt/chat-prompt";
import { ChatPromptContainer } from "@/features/chat/chat-prompt/chat-prompt-container";
interface Props {}

const ChatPromptEmptyState: FC<Props> = (props) => {
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
              placeholder=""
              className="min-h-fit bg-background shadow-sm resize-none py-0 "
            ></Textarea>
          </div>
          <p className="text-xs text-muted-foreground">
            <Textarea
          placeholder="
          "
          className="min-h-fit bg-background shadow-sm resize-none py-4 pr-[80px] h-[50vh]"
        ></Textarea>
          </p>
          <Button
            variant={"ghost"}
            size={"sm"}
            title="削除"
            className="justify-right flex bg-green-500 text-white"
            //onClick={handleButtonClick}
          >
            削除
          </Button>
          <Button
            variant={"ghost"}
            size={"sm"}
            title="保存"
            className="justify-right flex bg-green-500 text-white"
            //onClick={handleButtonClick}
          >
            保存
          </Button>
     </Card>
    </div>

  );
};

export default ChatPromptEmptyState;
