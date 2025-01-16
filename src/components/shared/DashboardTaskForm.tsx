import React, { ComponentPropsWithoutRef } from "react";
import { Input } from "../ui/input";
import { useForm, useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDashboardStore } from "@/store/DashboardStore";
import { Priority } from "@/types/taskType";
import { v4 } from "uuid";
import { ArrowUp } from "lucide-react";
import { CustomSelect } from "./CustomSelect";

type Form = {
  description: string;
  priority: Priority;
};
const PrioritySchema = z.nativeEnum(Priority);

interface DashboardTaskFormProps extends ComponentPropsWithoutRef<"form"> {}

const options = [
  { value: Priority.Low, label: "Low" },
  { value: Priority.Medium, label: "Medium" },
  { value: Priority.High, label: "High" },
];

const formSchema = z.object({
  description: z
    .string()
    .min(3, { message: "Description must contain at least 3 character(s)" }),
  priority: PrioritySchema,
});

export const DashboardTaskForm = React.forwardRef<
  HTMLFormElement,
  DashboardTaskFormProps
>(({ className, ...props }, ref) => {
  const sectionId = useDashboardStore((state) => state.sections)[0].id;
  const addTaskToSection = useDashboardStore((state) => state.addTaskToSection);
  const { register, handleSubmit, formState, reset, control, setValue } =
    useForm<Form>({
      defaultValues: {
        description: "",
        priority: Priority.Low,
      },
      resolver: zodResolver(formSchema),
    });
  const selectedValue = useWatch({ control: control, name: "priority" });
  const onSubmit = (data: Form) => {
    addTaskToSection({ id: v4(), ...data }, sectionId);
    reset();
  };
  const onSelectChange = (value: unknown) => {
    try {
      const validatedValue = PrioritySchema.parse(value);
      setValue("priority", validatedValue);
    } catch (error) {
      console.log(error);
    }
  };
  const { errors, isSubmitting } = formState;
  return (
    <section>
      <form
        {...props}
        className={cn("flex flex-col gap-2", className)}
        ref={ref}
        action="#"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          aria-invalid={errors.description ? "true" : "false"}
          label="Description"
          {...register("description")}
          errorMessage={errors.description?.message}
        />
        <CustomSelect
          options={options}
          onChange={onSelectChange}
          defaultValue={selectedValue}
          icon={<ArrowUp />}
        />
        <Button disabled={isSubmitting} type="submit">
          Add Task
        </Button>
      </form>
    </section>
  );
});
