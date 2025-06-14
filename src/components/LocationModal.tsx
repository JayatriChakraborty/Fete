
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type LocationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onGiveAccess: () => void;
};

const LocationModal = ({ isOpen, onClose, onGiveAccess }: LocationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Your Location</DialogTitle>
          <DialogDescription>
            Find Events Near You
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Later</Button>
          <Button 
            className="bg-gradient-to-r from-brand-blue to-brand-pink text-white" 
            onClick={onGiveAccess}
          >
            Give Location Access
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LocationModal;
