import {
  Camera,
  Video,
  Shield,
  ShieldCheck,
  Radar,
  Grid3x3,
  Flashlight,
  Bell,
  BatteryCharging,
  Activity,
  Router,
  DoorOpen,
  Droplet,
  MemoryStick,
  Sun,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { IconKey, StepIconKey } from "../../lib/types";

/** Maps our data-driven icon keys to lucide-react components, keeping products.json decoupled from the icon library. */
export const stepIcons: Record<StepIconKey, LucideIcon> = {
  "step-camera": Camera,
  "step-shield": Shield,
  "step-sensor": Radar,
  "step-grid": Grid3x3,
};

export const productIcons: Record<IconKey, LucideIcon> = {
  "camera-cube": Camera,
  "camera-pan": Video,
  floodlight: Flashlight,
  doorbell: Bell,
  "battery-cam": BatteryCharging,
  "shield-plan": Shield,
  "shield-plan-plus": ShieldCheck,
  "sensor-motion": Activity,
  "sensor-hub": Router,
  "sensor-entry": DoorOpen,
  "sensor-water": Droplet,
  "sd-card": MemoryStick,
  "solar-panel": Sun,
  "mount-kit": Wrench,
};
