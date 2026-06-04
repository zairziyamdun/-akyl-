"use client";

import Image from "next/image";
import {
  type FormEvent,
  type ReactNode,
  type TextareaHTMLAttributes,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import {
  consultationImages,
  roleOptions,
} from "@/data/consultationData";

import { consultationSectionMotion } from "./consultationMotion";

type FormState = {
  name: string;
  phone: string;
  email: string;
  organization: string;
  role: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  organization: "",
  role: "",
  message: "",
};

function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-[120px] w-full resize-y rounded-xl bg-white px-4 py-3 text-sm text-slate-900 ring-1 ring-black/10 outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-sky-400/80",
        className,
      )}
      {...props}
    />
  );
}

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-sm font-medium text-slate-700"
    >
      {children}
    </label>
  );
}

export function ConsultationForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const reduced = useReducedMotion();

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Section id="consultation-form" className="bg-slate-50/80 pb-20 md:pb-28">
      <Container>
        <motion.div {...consultationSectionMotion}>
          <SectionHeading
            eyebrow="Заявка"
            title="Оставить заявку на консультацию"
            description="Заполните форму — мы свяжемся с вами и предложим подходящий формат работы."
            align="center"
            className="mx-auto"
          />

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              initial={reduced ? false : { opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden min-h-[420px] lg:block"
            >
              <Image
                src={consultationImages.form}
                alt=""
                fill
                className="object-cover"
                sizes="480px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-slate-900/10" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-xs font-medium tracking-widest text-sky-200 uppercase">
                  Центр компетенций AKYL
                </p>
                <p className="mt-2 text-xl font-semibold text-white">
                  Ответим в течение 1 рабочего дня
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Подберём формат: экспресс, аудит или сопровождение.
                </p>
              </div>
            </motion.div>

            <div className="p-6 sm:p-8 lg:p-10">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-cyan-50/50 px-6 py-12 text-center"
                    role="status"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                        delay: 0.1,
                      }}
                      className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-2xl text-white"
                    >
                      ✓
                    </motion.div>
                    <p className="text-lg font-semibold text-emerald-900">
                      Заявка принята. Мы свяжемся с вами.
                    </p>
                    <p className="mt-2 text-sm text-emerald-800/90">
                      Спасибо за обращение в AKYL.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <FieldLabel htmlFor="name">Имя</FieldLabel>
                        <Input
                          id="name"
                          name="name"
                          required
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          placeholder="Ваше имя"
                        />
                      </div>
                      <div>
                        <FieldLabel htmlFor="phone">Телефон</FieldLabel>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          placeholder="+7 (___) ___-__-__"
                        />
                      </div>
                    </div>

                    <div>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="email@company.kz"
                      />
                    </div>

                    <div>
                      <FieldLabel htmlFor="organization">Организация</FieldLabel>
                      <Input
                        id="organization"
                        name="organization"
                        value={form.organization}
                        onChange={(e) =>
                          update("organization", e.target.value)
                        }
                        placeholder="Название УК, ОСИ, компании"
                      />
                    </div>

                    <div>
                      <FieldLabel htmlFor="role">Тип объекта / роль</FieldLabel>
                      <select
                        id="role"
                        name="role"
                        required
                        value={form.role}
                        onChange={(e) => update("role", e.target.value)}
                        className="h-11 w-full rounded-xl bg-white px-4 text-sm text-slate-900 ring-1 ring-black/10 outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80"
                      >
                        <option value="" disabled>
                          Выберите роль
                        </option>
                        {roleOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <FieldLabel htmlFor="message">Сообщение</FieldLabel>
                      <Textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        placeholder="Кратко опишите задачу или контекст объекта"
                      />
                    </div>

                    <motion.div
                      whileHover={reduced ? undefined : { scale: 1.02 }}
                      whileTap={reduced ? undefined : { scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="w-full bg-sky-600 hover:bg-sky-700 sm:w-auto"
                      >
                        Отправить заявку
                      </Button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
