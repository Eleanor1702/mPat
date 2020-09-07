using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Backend
{
    public class Startup {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            //CORS Services => Allow only Frontend (in this case, localhost port 3000)
            services.AddCors(options => {
                options.AddPolicy("AllowCors", builder => {
                    builder.WithOrigins("http://localhost:3000")
                    .WithMethods("GET", "PUT", "POST", "DELETE")
                    .AllowAnyHeader();
                });
            });
            //AppDb is now available to controller methods
            services.AddTransient<AppDb>(a => new AppDb(Configuration["ConnectionStrings:DefaultConnection"]));
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            //Allow CORS (Cross-Origin-Resource Sharing) from this domain
            app.UseCors("AllowCors"); 
            app.UseAuthorization();

            //Set default routes
            app.UseEndpoints(endpoints => {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}"
                );
            });
        }
    }
}
