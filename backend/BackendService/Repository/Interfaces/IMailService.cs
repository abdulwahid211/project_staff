﻿using BackendService.Model;

namespace BackendService.Repository.Interfaces
{
    public interface IMailService
    {
        Task<bool> SendAsync(MailData mailData, CancellationToken ct);

        string GetEmailTemplate<T>(string emailTemplate, T emailTemplateModel);
    }
}
