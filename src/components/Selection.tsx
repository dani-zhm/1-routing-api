import { useAtom } from "jotai";
import { FC } from "react";
import { Selections, selectionAtom, destLngLatAtom, originLngLatAtom } from "../atoms";
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
      className={isSelected ? "border-black" : ""}
    >
      {title}
    </Button>
  );
};

interface ISelection {
  initialValue: number;
}

const Selection: FC<ISelection> = ({ initialValue }) => {
  const [selection, setSelection] = useAtom(selectionAtom);
  const isOriginSelected = selection === Selections.ORIGIN || false;
  const [originLngLat] = useAtom(originLngLatAtom);
  const [destLngLat] = useAtom(destLngLatAtom);

  return (
    <div>
      <div className="flex gap-4">
        <SelectButton title="Origin" value={Selections.ORIGIN} />
        <SelectButton title="Dest" value={Selections.DESTINATION} />
      </div>

      <div className="p-4">
        <p>Longitude & Latitude for:</p>
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
