import { useAtom } from "jotai";
import {
  Selections,
  selectionAtom,
  destLngLatAtom,
  originLngLatAtom,
} from "../atoms";
import Button from "./ui/Button";

const SelectButton = ({
  title,
  value,
}: {
  title: string;
  value: Selections;
}) => {
  const [selection, setSelection] = useAtom(selectionAtom);
  const isSelected = selection === value;

  return (
    <Button
      onClick={() => setSelection(value)}
      className={`${isSelected ? "border-slate-700 underline" : ""}`}
    >
      {title}
    </Button>
  );
};

const Selection = () => {
  const [selection] = useAtom(selectionAtom);
  const isOriginSelected = selection === Selections.ORIGIN || false;
  const [originLngLat] = useAtom(originLngLatAtom);
  const [destLngLat] = useAtom(destLngLatAtom);

  return (
    <div>
      <div className="flex gap-4">
        <SelectButton title="Origin" value={Selections.ORIGIN} />
        <SelectButton title="Dest" value={Selections.DESTINATION} />
      </div>

      <div className="py-4">
        <p className="uppercase">Longitude & Latitude for:</p>
        <ul>
          <li className={isOriginSelected ? "font-bold" : ""}>
            Origin: [{originLngLat.join(", ")}]
          </li>
          <li className={isOriginSelected ? "" : "font-bold"}>
            Dest: [{destLngLat.join(", ")}]
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Selection;
