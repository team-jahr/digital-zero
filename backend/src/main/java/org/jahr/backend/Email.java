package org.jahr.backend;

import io.github.cdimascio.dotenv.Dotenv;

import javax.mail.*;
import javax.mail.internet.*;
import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.Properties;


public class Email {
    Session newSession = null;
    MimeMessage mimeMessage = null;

    public void sendEmail() throws MessagingException {
        Dotenv dotenv = null;
        dotenv = Dotenv.configure().load();
        String user = dotenv.get("EMAIL_USER");
        String userPassword = dotenv.get("EMAIL_PASSWORD");
        String emailHost = "smtp.gmail.com";
        Transport transport = newSession.getTransport("smtp");
        transport.connect(emailHost, user, userPassword);
        transport.sendMessage(mimeMessage, mimeMessage.getAllRecipients());
        transport.close();
        System.out.println("Email sent");
    }

    public MimeMessage draftEmail(String emails, String body, String title) throws MessagingException, IOException {
        String[] emailRecipients = emails.split(",");
        String emailSubject = "Report from inspection " + title;
        mimeMessage = new MimeMessage(newSession);
        Arrays.stream(emailRecipients).forEach(el-> {
            System.out.println("email = " + el);
            try {
                mimeMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(el));
            } catch (MessagingException e) {
                throw new RuntimeException(e);
            }
        });
        mimeMessage.setSubject(emailSubject);
        MimeBodyPart bodyPart = new MimeBodyPart();
        bodyPart.setText(body, "UTF-8");
        MimeBodyPart attachmentPart = new MimeBodyPart();
        attachmentPart.attachFile(new File(""));
        MimeMultipart multipart = new MimeMultipart();
        multipart.addBodyPart(bodyPart);
        mimeMessage.setContent(multipart);
        return mimeMessage;
    }

    public void setUpServerProperties() {
        Properties prop = System.getProperties();
        prop.put("mail.smtp.auth", true);
        prop.put("mail.smtp.starttls.enable", "true");
        prop.put("mail.smtp.port", "587");
        newSession = Session.getDefaultInstance(prop, null);
    }
}
