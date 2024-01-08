import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { FilterIcon } from "lucide-react";

export const Filter = ({ videos, setFilteredVideos }) => {
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleFilterChange = async (filter) => {
    setSelectedFilter(filter);
    if (filter === "None") {
      setFilteredVideos(videos);
      return;
    }
    const response = await fetch(`https://wizbackend.cyclic.app/api/video/${filter}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Update the state with the received data
    setFilteredVideos(data.files);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="text-lg mr-4 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          <FilterIcon className="w-5 h-5 mr-2" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedFilter}
          onValueChange={handleFilterChange}
        >
          <DropdownMenuRadioItem value="None">None</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="sports">Sports</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Music">Music</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Entertainment">
            Entertainment
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Technology">
            Technology
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
