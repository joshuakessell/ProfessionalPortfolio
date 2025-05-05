import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface PrivacyPolicyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PrivacyPolicyModal({ open, onOpenChange }: PrivacyPolicyModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Privacy Policy</DialogTitle>
          <DialogDescription>
            Last updated: May 1, 2024
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4 text-sm">
            <p>
              This Privacy Policy describes how Joshua Kessell ("I", "me", or "my") collects, uses, and discloses your personal information when you visit my website at joshuakessell.com or contact me through the website.
            </p>

            <h3 className="text-lg font-semibold mt-4">Information I Collect</h3>
            <p>
              When you visit my website, I automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
            </p>
            <p>
              When you contact me through the contact form, I collect the personal information you provide, such as your name, email address, phone number, and any other information you choose to include in your message.
            </p>

            <h3 className="text-lg font-semibold mt-4">How I Use Your Information</h3>
            <p>
              I use the information collected to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Respond to your inquiries and provide you with the information or services you request</li>
              <li>Improve my website and services</li>
              <li>Communicate with you about my services, projects, or other relevant information</li>
              <li>Analyze how visitors use my website to improve the user experience</li>
              <li>Protect against fraud or unauthorized access</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4">Sharing Your Information</h3>
            <p>
              I will not share your personal information with third parties except as follows:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect and defend my rights and property</li>
              <li>With service providers who assist in my business operations (such as website hosting, email services, etc.)</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4">Data Retention</h3>
            <p>
              I will retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements.
            </p>

            <h3 className="text-lg font-semibold mt-4">Your Rights</h3>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction or objection to the processing of your personal information</li>
            </ul>
            <p>
              To exercise these rights, please contact me at hello@joshuakessell.com.
            </p>

            <h3 className="text-lg font-semibold mt-4">Security</h3>
            <p>
              I implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h3 className="text-lg font-semibold mt-4">Changes to This Privacy Policy</h3>
            <p>
              I may update this Privacy Policy from time to time to reflect changes in my practices or for other operational, legal, or regulatory reasons. I will post the updated Privacy Policy on my website with the revised effective date.
            </p>

            <h3 className="text-lg font-semibold mt-4">Contact Me</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact me at hello@joshuakessell.com.
            </p>
          </div>
        </ScrollArea>
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}