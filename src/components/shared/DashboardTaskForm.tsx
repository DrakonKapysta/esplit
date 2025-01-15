import React, { ComponentPropsWithoutRef } from "react";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDashboardStore } from "@/store/DashboardStore";
import { Priority } from "@/types/taskType";
import { v4 } from "uuid";

type Form = {
  description: string;
};
interface DashboardTaskFormProps extends ComponentPropsWithoutRef<"form"> {}

const formSchema = z.object({
  description: z
    .string()
    .min(3, { message: "Description must contain at least 3 character(s)" }),
});

export const DashboardTaskForm = React.forwardRef<
  HTMLFormElement,
  DashboardTaskFormProps
>(({ className, ...props }, ref) => {
  const sectionId = useDashboardStore((state) => state.sections)[0].id;
  const addTaskToSection = useDashboardStore((state) => state.addTaskToSection);
  const { register, handleSubmit, formState, reset } = useForm<Form>({
    defaultValues: {
      description: "",
    },
    resolver: zodResolver(formSchema),
  });
  const onSubmit = (data: Form) => {
    addTaskToSection({ id: v4(), ...data, priority: Priority.Low }, sectionId);
    reset();
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
        <Button disabled={isSubmitting} type="submit">
          Add Task
        </Button>
      </form>
    </section>
  );
});
