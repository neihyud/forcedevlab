"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface ReportRegisterFormValues {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
}

export default function ReportRegisterForm() {
  const t = useTranslations("Form");
  const [loading, setLoading] = useState(false);

  const reportFormSchema = z.object({
    fullName: z.string().min(2, { message: t("valNameMin") }),
    email: z.string().email({ message: t("valEmailInvalid") }),
    phone: z
      .string()
      .min(8, { message: t("valPhoneMin") })
      .max(15, { message: t("valPhoneMax") })
      .regex(/^[+0-9\s().-]+$/, { message: t("valPhoneInvalid") }),
    subject: z.string().min(3, { message: t("valSubjectMin") }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReportRegisterFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
    },
  });

  const onSubmit = async (data: ReportRegisterFormValues) => {
    setLoading(true);
    try {
      // Simulate API call to register service
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Report registration submitted data:", data);

      toast.success(t("submitSuccess"), {
        description: t("submitSuccessDesc"),
      });
      reset();
    } catch (error) {
      console.error(error);
      toast.error(t("submitError"), {
        description: t("submitErrorDesc"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-[12px] p-6 shadow-300">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#344054]">
            {t("fullName")}
          </label>
          <Input
            type="text"
            placeholder={t("fullNamePlaceholder")}
            className="rounded-lg"
            aria-invalid={!!errors.fullName}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-xs text-red-500 font-medium">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Phone & Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#344054]">
              {t("phone")}
            </label>
            <Input
              type="text"
              placeholder={t("phonePlaceholder")}
              className="rounded-lg"
              aria-invalid={!!errors.phone}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 font-medium">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#344054]">
              {t("email")}
            </label>
            <Input
              type="email"
              placeholder={t("emailPlaceholder")}
              className="rounded-lg"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#344054]">
            {t("subject")}
          </label>
          <Input
            type="text"
            placeholder={t("subjectPlaceholder")}
            className="rounded-lg"
            aria-invalid={!!errors.subject}
            {...register("subject")}
          />
          {errors.subject && (
            <p className="text-xs text-red-500 font-medium">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          className="w-full text-white font-semibold py-6 rounded-lg cursor-pointer transition-colors duration-300 mt-2 text-sm justify-center"
          loading={loading}
        >
          {loading ? t("loading") : t("submit")}
        </Button>
      </form>
    </div>
  );
}
