"use client"
import * as React from "react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  gender: z.string().min(1, "Gender is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export const ContactForm = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      gender: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Form submitted successfully!");
      form.reset(); // Automatically reset form after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md w-full sm:w-[28rem] md:w-[32rem] lg:w-[36rem] p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Form</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your name" 
                        {...field} 
                        className="h-10 rounded-md border border-gray-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="Your email" 
                        {...field} 
                        className="h-10 rounded-md border border-gray-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone Number */}
              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        type="tel" 
                        placeholder="Your phone number" 
                        {...field} 
                        className="h-10 rounded-md border border-gray-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender */}
              <FormField
                name="gender"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Gender</FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            className="flex w-full h-10 items-center justify-between rounded-md border border-gray-200 px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                            aria-label="Select Gender"
                          >
                            {field.value || "Select Gender"}
                            <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white border border-gray-200 rounded-lg shadow-md">
                          {["Male", "Female", "Non-binary", "Other"].map((option) => (
                            <DropdownMenuItem
                              key={option}
                              onClick={() => field.onChange(option)}
                              className="w-full p-2 hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
                            >
                              {option}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password */}
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Your password" 
                        {...field} 
                        className="h-10 rounded-md border border-gray-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Confirm Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Confirm your password" 
                        {...field} 
                        className="h-10 rounded-md border border-gray-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-purple-600 text-white hover:bg-purple-700 h-10"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <span className="loader mr-2"></span> Submitting...
                  </div>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;