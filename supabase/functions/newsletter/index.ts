
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { supabase } from "../_shared/supabase.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: NewsletterRequest = await req.json();

    // Store subscription in database (you'll need to create this table)
    const { error: dbError } = await supabase
      .from('newsletter_subscriptions')
      .insert([
        { 
          email: email,
          subscribed_at: new Date().toISOString(),
          status: 'active'
        }
      ]);

    if (dbError && !dbError.message.includes('duplicate')) {
      throw dbError;
    }

    // Send welcome email
    const emailResponse = await resend.emails.send({
      from: "EXIM CRM <noreply@eximcrm.com>",
      to: [email],
      subject: "Welcome to EXIM CRM Newsletter!",
      html: `
        <h1>Welcome to EXIM CRM Newsletter!</h1>
        <p>Thank you for subscribing to our newsletter. You'll now receive the latest updates on:</p>
        <ul>
          <li>International trade regulations</li>
          <li>Platform features and updates</li>
          <li>Industry insights and best practices</li>
          <li>Upcoming webinars and events</li>
        </ul>
        <p>We're excited to have you on board!</p>
        <p>Best regards,<br>The EXIM CRM Team</p>
        <hr>
        <p style="font-size: 12px; color: #666;">
          You can unsubscribe at any time by clicking 
          <a href="https://eximcrm.com/unsubscribe?email=${encodeURIComponent(email)}">here</a>.
        </p>
      `,
    });

    console.log("Newsletter subscription email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in newsletter function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
