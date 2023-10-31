using BackendService.Model;
using BackendService.Repository.Interfaces;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Utils;
using RazorEngineCore;
using System.Net.Mail;
using System.Text;

namespace BackendService.Repository
{
    public class MailService : IMailService
    {
        private readonly MailSettings _settings;

        public MailService(IOptions<MailSettings> settings)
        {
            _settings = settings.Value;
        }

        public async Task<bool> SendAsync(MailData mailData, CancellationToken ct = default)
        {
            try
            {
                // Initialize a new instance of the MimeKit.MimeMessage class
                var mail = new MimeMessage();

                #region Sender / Receiver
                // Sender
                mail.From.Add(new MailboxAddress(_settings.DisplayName, mailData.From ?? _settings.From));
                mail.Sender = new MailboxAddress(mailData.DisplayName ?? _settings.DisplayName, mailData.From ?? _settings.From);

                // Receiver
                mail.To.Add(MailboxAddress.Parse(mailData.To));

                #endregion

                #region Content

                // Add Content to Mime Message
                var body = new BodyBuilder();
                mail.Subject = mailData.Subject;

                LinkedResource LinkedImage = new LinkedResource(GetImagePath("logo"));
                LinkedImage.ContentId = "logo";

                var image = body.LinkedResources.Add(GetImagePath("logo"));
                image.ContentId = MimeUtils.GenerateMessageId();

                body.HtmlBody = mailData.Body.Replace("LOGO", string.Format("cid:{0}", image.ContentId));
                mail.Body = body.ToMessageBody();

                #endregion

                #region Send Mail
                using var smtp = new MailKit.Net.Smtp.SmtpClient();

                if (_settings.UseSSL)
                {
                    await smtp.ConnectAsync(_settings.Host, _settings.Port, SecureSocketOptions.SslOnConnect, ct);
                }
                else if (_settings.UseStartTls)
                {
                    await smtp.ConnectAsync(_settings.Host, _settings.Port, SecureSocketOptions.StartTls, ct);
                }
                await smtp.AuthenticateAsync(_settings.UserName, _settings.Password, ct);
                await smtp.SendAsync(mail, ct);
                await smtp.DisconnectAsync(true, ct);

                #endregion

                return true;

            }
            catch (Exception e)
            {
                Console.WriteLine("smtp FAILED!!!!!!!!!!!!!!!");
                Console.WriteLine(e);
                System.Diagnostics.Debug.WriteLine(e);
                return false;
            }
        }

        public string GetEmailTemplate<T>(string emailTemplate, T emailTemplateModel)
        {
            string mailTemplate = LoadTemplate(emailTemplate);

            IRazorEngine razorEngine = new RazorEngine();
            IRazorEngineCompiledTemplate modifiedMailTemplate = razorEngine.Compile(mailTemplate);

            return modifiedMailTemplate.Run(emailTemplateModel);
        }

        private string GetImagePath(string imageFile)
        {
            string baseDir = AppDomain.CurrentDomain.BaseDirectory;
            string AssetDir = System.IO.Path.Combine(baseDir, "Asset");
            return System.IO.Path.Combine(AssetDir, $"{imageFile}.png");
        }

        private string LoadTemplate(string emailTemplate)
        {
            string baseDir = AppDomain.CurrentDomain.BaseDirectory;
            string templateDir = System.IO.Path.Combine(baseDir, "EmailTemplates");
            string templatePath = System.IO.Path.Combine(templateDir, $"{emailTemplate}.cshtml");

            using FileStream fileStream = new FileStream(templatePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
            using StreamReader streamReader = new StreamReader(fileStream, Encoding.Default);

            string mailTemplate = streamReader.ReadToEnd();
            streamReader.Close();

            return mailTemplate;
        }










    }
}