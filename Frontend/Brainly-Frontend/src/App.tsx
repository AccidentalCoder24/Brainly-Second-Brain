import { Button } from "./components/ui/Button"
import { CrossIcon } from "./Icons/CrossIcon"
import { Logo } from "./Icons/Logo"
import { PlusIcon } from "./Icons/PlusIcon"
import { ShareIcon } from "./Icons/ShareIcon"
import { TwitterIcon } from "./Icons/TwitterIcon"
import { YoutubeIcon } from "./Icons/YoutubeIcon"

function App(){
  return <div>
    <Button startIcon={<PlusIcon/>} variant="primary" text="Add" />
    <br />
    <Button startIcon={<ShareIcon/>} variant="secondary" text="Share" />
    <br />
    <Button startIcon={<CrossIcon/>} variant="primary" text="Remove" />
    <br />
    <Button startIcon={<Logo/>} variant="secondary" text="Logo" />
    <br />
    <Button startIcon={<YoutubeIcon/>} variant="primary" text="Share on Youtube" />
    <br />
    <Button startIcon={<TwitterIcon/>} variant="secondary" text="Share on Twitter" />

  </div>
}

export default  App 