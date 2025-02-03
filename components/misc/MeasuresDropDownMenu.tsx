import { Measure } from "@/types";
import { useState } from "react";
import { Button } from "../ui/button";


interface DropdownMenuProps {
  measures: Measure[];
}

const MeasuresDropdownMenu = ({ measures }: DropdownMenuProps) => {
  const [hoveredMeasure, setHoveredMeasure] = useState<Measure | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMeasure, setSelectedMeasure] = useState<Measure | null>(null);

  const handleMeasureClick = (measure: Measure) => {
    setSelectedMeasure(measure);
    setDialogOpen(true);
  };

  return (
    <div className="relative">
      <Button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        Measures
      </Button>
      {menuOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
          {measures.map((measure) => (
            <div
              key={measure.id}
              className="p-2 hover:bg-gray-100 cursor-pointer relative"
              onMouseEnter={() => setHoveredMeasure(measure)}
              onMouseLeave={() => setHoveredMeasure(null)}
              onClick={() => handleMeasureClick(measure)}
            >
              {measure.name}
              {hoveredMeasure?.id === measure.id && (
                <div className="absolute top-0 left-full w-40 bg-white border border-gray-200 rounded shadow-lg z-20">
                  {measure.followUps.map((followUp) => (
                    <div
                      key={followUp.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {followUp.date}
                      <div className="text-xs text-gray-500">
                        {followUp.description}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {dialogOpen && selectedMeasure && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-30">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-semibold">Measure Details</h2>
            <p>
              <strong>Name:</strong> {selectedMeasure.name}
            </p>
            <p>
              <strong>Follow-Up In Charge:</strong> {selectedMeasure.followUpInCharge}
            </p>
            <p>
              <strong>Responsible Person:</strong> {selectedMeasure.responsiblePerson}
            </p>
            <Button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setDialogOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeasuresDropdownMenu;
