import { Button } from "./components/ui/Button";
import { PlusIcon } from "./Icons/PlusIcon";
import { ShareIcon } from "./Icons/ShareIcon";
import { Card } from "./components/ui/Card";

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>;

function App() {
  return (
    <div className="m-20">
      <div className="flex space-x-3 absolute top-20 right-20 my-20">
        <Button startIcon={<ShareIcon />} variant="secondary" text="Share Brain" />
        <Button startIcon={<PlusIcon />} variant="primary" text="Add Content" />
      </div>
      <div className="flex space-x-4 max-w-full overflow-auto">
        <Card title={"My first youtube video"} link={"https://www.youtube.com/watch?v=YQHsXMglC9A"} type="youtube" />
        <Card title={"My first tweet"} link={"https://x.com/Mick_O_Keeffe/status/1885081000822055071"} type="twitter" />
      </div>
    </div>
  );
}

export default App;
