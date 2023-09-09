using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendService.Model
{
    [Table("appliedJobs")]
    public class AppliedJobs
    {
        [Key]
        public int? AppliedJobsID { get; set; }
        public int ApplicantID { get; set; }
        public int VacancyID { get; set; }
    }
}
